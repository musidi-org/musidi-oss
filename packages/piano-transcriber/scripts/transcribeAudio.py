import time
import os
import sys
import multiprocessing as mp

from src import preprocess, inference, postprocess  # type: ignore


def inferencing(batchSegment, i):
    inferenceEngine = inference.InferenceEngine(["CPUExecutionProvider"])
    return inferenceEngine(batchSegment, i)


def transcribeFile(audioFileName):
    elapsed_seconds = time.time()
    current_seconds = time.time()

    # Keep filepath separate from keys
    audioFilePath = f"{audioFileName}"
    webmFilePath = preprocess.audioToWebm(audioFilePath)
    midiFilePath = f"{audioFilePath}.mid"

    print("Conversion time {:.4f}".format(time.time() - current_seconds))
    current_seconds = time.time()

    batchSegments = preprocess.preprocess(webmFilePath)
    print("Preprocess time {:.4f}".format(time.time() - current_seconds))

    print("Transcribing", len(batchSegments), "segment:")
    current_seconds = time.time()

    inference_pool = mp.get_context("fork").Pool()
    inference_input = zip(batchSegments, range(len(batchSegments)))
    midiSegments = inference_pool.starmap(inferencing, inference_input)
    inference_pool.close()

    print("Inference time {:.4f}".format(time.time() - current_seconds))
    current_seconds = time.time()

    postprocess.postprocess(midiSegments, midiFilePath)

    print("Postprocess time {:.4f}".format(time.time() - current_seconds))
    print("Audio transcribed in {:.4f} seconds".format(time.time() - elapsed_seconds))
    os.remove(webmFilePath)


if __name__ == "__main__":
    for fileName in sys.argv[1:]:
        print(f"Attempting to transcribe {fileName}")
        transcribeFile(fileName)
