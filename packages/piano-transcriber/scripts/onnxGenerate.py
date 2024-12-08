import torch
import onnx
import os
from onnxconverter_common import float16

from src import config, models

# Specify model input and output paths
modelDir = "src/model"
checkpointPath = f"{modelDir}/pianoTranscriberModel.pth"
if not os.path.isfile(checkpointPath):
    raise Exception(f"{checkpointPath} does not exist.")
modelPath = f"{modelDir}/{config.onnx_path}"

# Load model for CPU
model = models.Note_pedal(config.frames_per_second, config.classes_num)
device = torch.device("cpu")
checkpoint = torch.load(checkpointPath, map_location=device)

model.load_state_dict(checkpoint["model"], strict=False)
model.to(device=device)

torch.onnx.export(
    model=model,
    args=torch.randn(1, config.segment_seconds * config.sample_rate, device=device),
    f=modelPath,
    input_names=["input"],
    output_names=[
        "reg_onset_output",
        "reg_offset_output",
        "frame_output",
        "velocity_output",
        "reg_pedal_onset_output",
        "reg_pedal_offset_output",
        "pedal_frame_output",
    ],
)

print("\n\n\nQUANTISING FP16:\n\n\n")

# Quantize
model = onnx.load(modelPath)
onnx.checker.check_model(model)  # Validate ONNX model
model_fp16 = float16.convert_float_to_float16(model)
onnx.save(model_fp16, modelPath)

# TODO: disable opset upgrade for aws-sam-cli using onnxruntime==1.16.3 for compatibility
# poetry refuses to install onnxruntime==1.16.3 locally
# later onnxruntime versions requires opset upgrade
print("\n\n\nUPGRADE ONNX:\n\n\n")

# Upgrade ONNX opset
upgradedModel = onnx.version_converter.convert_version(model_fp16, 21)
onnx.save(upgradedModel, modelPath)
