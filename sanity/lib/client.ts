import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
})
