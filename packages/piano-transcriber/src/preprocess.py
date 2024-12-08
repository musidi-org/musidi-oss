import subprocess
import wave
import os
import shutil
import numpy as np

from .config import sample_rate, segment_seconds

for commands in ["/opt/python/ffmpeg", "ffmpeg"]:
    if shutil.which(commands) is not None:
        ffmpegPath = commands
        break
if ffmpegPath is None:
    raise Exception("Cannot find FFMPEG path")
segment_samples = int(sample_rate * segment_seconds)

print(ffmpegPath)
print(ffmpegPath)
print(ffmpegPath)
print(ffmpegPath)
print(ffmpegPath)


def preprocess(audioFilePath):
    # Use local or lambda layer binary
    audio = loadAudio(audioFilePath)[None, :]  # (1, audio_samples)
    audio_len = audio.shape[1]

    # Pad audio to be evenly divided by segment_samples
    pad_len = int(np.ceil(audio_len / segment_samples)) * segment_samples - audio_len
    audio = np.concatenate((audio, np.zeros((1, pad_len))), axis=1)

    # Enframe to segments
    segments = np.concatenate(enframe(audio, segment_samples), axis=0)
    batch_segments = []
    for pointer in range(len(segments)):
        batch_segments.append(segments[pointer : pointer + 1])
    return np.array(batch_segments, dtype=np.float16)


def enframe(x, segment_samples):
    batch = []
    pointer = 0
    while pointer + segment_samples <= x.shape[1]:
        batch.append(x[:, pointer : pointer + segment_samples])
        pointer += segment_samples // 2
    return batch


def loadAudio(audioFilePath):
    # Convert audio to 16kHz mono wav
    wavFilePath = audioFilePath + ".wav"
    exitCode = subprocess.Popen(
        [
            ffmpegPath,
            "-y",
            "-i",
            audioFilePath,
            "-ar",
            f"{sample_rate}",
            "-ac",
            "1",
            wavFilePath,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    ).wait()
    if exitCode != 0:
        raise Exception("Converting to wav not successful")

    waveFile = wave.open(wavFilePath, "rb")
    samples = waveFile.getnframes()
    audio = waveFile.readframes(samples)
    waveFile.close()
    os.remove(wavFilePath)

    dt = np.dtype(np.int16)
    audio = np.frombuffer(audio, dtype=dt) / 2**15
    return audio


def audioToWebm(audioFilePath):
    webmPath = f"{audioFilePath}.webm"
    trimSilence = (
        "areverse,silenceremove=start_periods=1:start_silence=0.5:start_threshold=0.02"
    )
    trimSilence = f"{trimSilence},{trimSilence}"
    exitCode = subprocess.Popen(
        [
            ffmpegPath,
            "-y",
            "-i",
            audioFilePath,
            "-vn",
            "-map_metadata",
            "-1",
            "-ar",
            "48k",
            "-b:a",
            "96k",
            "-ac",
            "0",
            "-acodec",
            "libopus",
            "-af",
            trimSilence,
            webmPath,
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.STDOUT,
    ).wait()
    if exitCode != 0:
        raise Exception("Converting to webm not successful")
    return webmPath
