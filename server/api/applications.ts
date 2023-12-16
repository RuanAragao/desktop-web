import { promises as fsPromises, constants, PathLike } from 'fs'
import { join } from 'path'

const IGNORED_FILES = ['.eslintrc.cjs']

const getAppDirectory = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'

  const baseDir = isDevelopment
    ? process.cwd()
    : join(process.cwd(), '..', 'applications')

  return baseDir
}

async function readJsonFile(filePath: PathLike | fsPromises.FileHandle) {
  try {
    const rawData = await fsPromises.readFile(filePath, 'utf-8')
    return JSON.parse(rawData)
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error)
    return null
  }
}

async function getApplications() {
  const applicationsDir = getAppDirectory()
  console.log('applicationsDir:', applicationsDir)

  try {
    const appFolders = await fsPromises.readdir(applicationsDir)

    const appDataPromises = appFolders.map(async (folder) => {
      if (IGNORED_FILES.includes(folder)) return null

      const dataPath = join(applicationsDir, folder, 'data.json')
      try {
        await fsPromises.access(dataPath, constants.R_OK)
        return readJsonFile(dataPath)
      } catch (error) {
        console.error(`Error accessing file ${dataPath}:`, error)
        return null
      }
    })

    const appData = await Promise.all(appDataPromises)
    return appData.filter((item) => item !== null)
  } catch (error) {
    console.error('Error reading application folders:', error)
    return []
  }
}

export default defineEventHandler(async (_event) => {
  try {
    const apps = await getApplications()
    return { apps }
  } catch (error) {
    console.error('Error in defineEventHandler:', error)
    return { apps: [] }
  }
})
