import mido
from scripts import transcribeAudio


def transcribeFileSnapshot(audioFileName):
    audioFilePath = f"samples/{audioFileName}"
    midiFilePath = f"{audioFilePath}.mid"
    transcribeAudio.transcribeFile(audioFilePath)
    mid = mido.MidiFile(midiFilePath)
    return {
        "noteTrackLength": len(mid.tracks[1]),
        "tempoTrack": mid.tracks[0],
        "ticks_per_beat": mid.ticks_per_beat,
    }


snapshot_mp3 = transcribeFileSnapshot("example.mp3")


def test_transcribe_mp3(snapshot):
    assert snapshot_mp3 == snapshot


def test_transcribe_webm():
    assert transcribeFileSnapshot("example.webm") == snapshot_mp3


def test_transcribe_ogg():
    assert transcribeFileSnapshot("example.ogg") == snapshot_mp3


def test_transcribe_flac():
    assert transcribeFileSnapshot("example.flac") == snapshot_mp3


def test_transcribe_m4a():
    assert transcribeFileSnapshot("example.m4a") == snapshot_mp3


def test_transcribe_opus():
    assert transcribeFileSnapshot("example.opus") == snapshot_mp3
