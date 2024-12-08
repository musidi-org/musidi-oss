import numpy as np

from . import config, regression


def postprocess(batch_output_dict, midi_path):
    def append_to_dict(dict, key, value):
        if key in dict.keys():
            dict[key].append(value)
        else:
            dict[key] = [value]

    output_dict = {}
    for single_output_dict in batch_output_dict:
        for key in single_output_dict.keys():
            append_to_dict(output_dict, key, single_output_dict[key].data)

    for key in output_dict.keys():
        output_dict[key] = deframe(np.concatenate(output_dict[key], axis=0))

    onset_threshold = 0.3
    offset_threshod = 0.3
    frame_threshold = 0.1
    pedal_offset_threshold = 0.2
    post_processor = regression.RegressionPostProcessor(
        config.frames_per_second,
        classes_num=config.classes_num,
        onset_threshold=onset_threshold,
        offset_threshold=offset_threshod,
        frame_threshold=frame_threshold,
        pedal_offset_threshold=pedal_offset_threshold,
    )

    # Post process output_dict to MIDI events
    (est_note_events, est_pedal_events) = post_processor.output_dict_to_midi_events(
        output_dict
    )

    # Write MIDI events to file
    if midi_path:
        regression.write_events_to_midi(
            start_time=0,
            note_events=est_note_events,
            pedal_events=est_pedal_events,
            midi_path=midi_path,
        )


def deframe(x):
    if x.shape[0] == 1:
        return x[0]
    else:
        y = deframe2(x)
        y = np.concatenate(y, axis=0)
        return y


def deframe2(x):
    x = x[:, 0:-1, :]
    """Remove an extra frame in the end of each segment caused by the
  'center=True' argument when calculating spectrogram."""
    (N, segment_samples, classes_num) = x.shape

    y = []
    y.append(x[0, 0 : int(segment_samples * 0.75)])
    for i in range(1, N - 1):
        y.append(x[i, int(segment_samples * 0.25) : int(segment_samples * 0.75)])
    y.append(x[-1, int(segment_samples * 0.25) :])
    return y
