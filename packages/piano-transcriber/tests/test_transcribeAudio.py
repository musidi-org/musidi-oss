from scripts import transcribeAudio


def transcribeFileSnapshot(audioFileName):
    audioFilePath = f"samples/{audioFileName}"
    midiFilePath = f"{audioFilePath}.mid"
    transcribeAudio.transcribeFile(audioFilePath)
    f = open(midiFilePath, "rb")
    return f.read()


def test_transcribe_mp3(snapshot):
    assert transcribeFileSnapshot("example.mp3") == snapshot


def test_transcribe_webm(snapshot):
    assert transcribeFileSnapshot("example.webm") == snapshot


def test_transcribe_ogg(snapshot):
    assert transcribeFileSnapshot("example.ogg") == snapshot


def test_transcribe_flac(snapshot):
    assert transcribeFileSnapshot("example.flac") == snapshot


def test_transcribe_m4a(snapshot):
    assert transcribeFileSnapshot("example.m4a") == snapshot


def test_transcribe_opus(snapshot):
    assert transcribeFileSnapshot("example.opus") == snapshot
