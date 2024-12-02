import os
import time
from onnxruntime import InferenceSession

from .config import onnx_path


def InferenceEngine(providers):
    modelPath = f"{os.path.dirname(os.path.realpath(__file__))}/model/{onnx_path}"
    model = InferenceSession(modelPath, providers=providers)
    keys = [
        "reg_onset_output",
        "reg_offset_output",
        "frame_output",
        "velocity_output",
        "reg_pedal_onset_output",
        "reg_pedal_offset_output",
        "pedal_frame_output",
    ]

    def inference(segment, segment_num=None):
        elapsed_seconds = time.time()

        outputs = model.run(None, {"input": segment})
        result = {}
        for i in range(len(keys)):
            result[keys[i]] = outputs[i]

        elapsed_seconds = time.time() - elapsed_seconds
        if segment_num is not None:
            print(
                "Inferenced segment {} in {:.4f} seconds".format(
                    segment_num + 1, elapsed_seconds
                )
            )
        return result

    return inference
