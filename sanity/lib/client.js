import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset: 'production',
  projectId: 'xl8aestu',
  useCdn: true,
})
