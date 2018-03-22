import * as express from 'express'
import * as fs from 'fs'
import * as http from 'http'
import { createConnection } from 'typeorm'
import { Container, Inject, Scope } from 'typescript-ioc'
import { MediaRepository } from './repositories/media-repository'

require('./system/extensions-string')

class Application
{
    public readonly app = express()

    constructor(@Inject private mediaRepository: MediaRepository)
    { }

    public async initDatabase()
    {
        try
        {
            // create database connection
            const connection = await createConnection()
            console.info('Database connection initialized')
        }
        catch (error)
        {
            console.error('Database connection failed', error)
            throw error
        }
    }

    public async saveOneItem()
    {
        await this.mediaRepository.saveTrack('path')
        console.info('Item saved successfully')
    }
}

// start app
const application: Application = Container.get(Application)
application.initDatabase().then(() =>
{
    application.saveOneItem()
})
