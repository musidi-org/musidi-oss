/// <reference types="vinxi/types/client" />

import { StartClient } from '@tanstack/start'
import { hydrateRoot } from 'react-dom/client'
import { createRouter } from './router'

hydrateRoot(document, <StartClient router={createRouter()} />)
