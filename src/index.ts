import * as fs from 'fs'
import * as path from 'path'
import * as fg from 'fast-glob'
import { createRoutes } from './template/routes'
import { resolveRoutePaths } from './resolve'

export interface GenerateConfig {
  pages: string
  moduleName?: string
  importPrefix?: string
  dynamicImport?: boolean
  nested?: boolean
}

export function generateRoutes({
  pages,
  moduleName = 'index',
  importPrefix = '@/pages/',
  dynamicImport = true,
  nested = false
}: GenerateConfig): string {
  const patterns = ['**/*.vue', '!**/__*__.vue', '!**/__*__/**']

  const pagePaths = fg.sync<string>(patterns, {
    cwd: pages,
    onlyFiles: true
  })

  const metaList = resolveRoutePaths(pagePaths, moduleName, importPrefix, nested, file => {
    return fs.readFileSync(path.join(pages, file), 'utf8')
  })

  return createRoutes(metaList, dynamicImport)
}
