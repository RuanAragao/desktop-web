import * as path from 'node:path'
import * as fs from 'node:fs'

const ignore = ['.eslintrc.cjs'] as Array<string>

function getApplications() {
  const applicationsDir = path.join(process.cwd(), 'applications')

  return fs.promises.readdir(applicationsDir).then((appFolders) =>
    Promise.all(
      appFolders.map(async (folder) => {
        if (ignore.includes(folder)) return

        const dataPath = path.join(applicationsDir, folder, 'data.json')
        if (!fs.existsSync(dataPath)) return

        const rawData = await fs.promises.readFile(dataPath, 'utf-8')
        const appData = JSON.parse(rawData)
        return appData
      }),
    ),
  )
}

export default defineEventHandler(async (_event) => {
  const returnData = await getApplications()
  const data = returnData.filter((item) => item !== undefined && item !== null)
  return { apps: data }
})
