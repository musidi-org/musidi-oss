from scripts import transcribeAudio


def transcribeFileSnapshot(audioFileName):
    audioFilePath = f"samples/{audioFileName}"
    midiFilePath = f"{audioFilePath}.mid"
    transcribeAudio.transcribeFile(audioFilePath)
    f = open(midiFilePath, "rb")
    return f.read()


def test_transcribe(snapshot):
    audioFiles = [
        "example.mp3",
        "example.webm",
        "example.ogg",
        "example.flac",
        "example.m4a",
        "example.opus",
    ]
    for audioFile in audioFiles:
        assert transcribeFileSnapshot(audioFile) == snapshot
