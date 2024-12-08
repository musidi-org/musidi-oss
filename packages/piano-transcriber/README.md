# piano-transcriber

Python package for extracting MIDI from piano audio.

## How does it work?

The piano audio is broken into segments before ML interference to detect potential events. Inference can occur in parallel. Finally the processed segments are stiched into MIDI via regression.
