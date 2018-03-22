import { getRepository } from 'typeorm'
import { Singleton } from 'typescript-ioc'
import { Album } from '../entities/album'
import { Artist } from '../entities/artist'
import { Track } from '../entities/track'

@Singleton
export class MediaRepository
{
    /**
     * saveTrack
     */
    public async saveTrack(path: string)
    {
        const trackRepository = await getRepository(Track)
        const artistRepository = await getRepository(Artist)
        const albumRepository = await getRepository(Album)

        const artistName = 'test artist'
        const trackTitle = 'test title'
        const albumName = 'test album'

        // handle artist
        let artist: Artist
        if (artistName)
        {
            const artistHash = Math.abs(artistName.trim().normalize().toLowerCase().hashCode()).toString()

            artist = await artistRepository.findOne({ hash: artistHash })
            if (!artist)
            {
                artist = new Artist()

                artist.name = artistName
                artist.hash = artistHash

                // await artistRepository.save(artist)
            }
        }

        // handle album
        let album: Album
        if (albumName)
        {
            const albumHash = Math.abs(albumName.trim().normalize().toLowerCase().hashCode()).toString()
            album = await albumRepository.findOne({ hash: albumHash })
            if (!album)
            {
                album = new Album()
                album.name = albumName
                album.hash = albumHash
                if (artist)
                    album.artists = [artist]

                // await albumRepository.save(album)
            }
        }

        // handle track    
        const trackHash = Math.abs((artistName.trim() + albumName.trim() + trackTitle.trim()).normalize().toLowerCase().hashCode()).toString()
        let track = await trackRepository.findOne({ filePath: path })
        if (!track)
        {
            track = new Track()
            track.hash = trackHash
            track.title = trackTitle
            track.filePath = path
            track.duration = 943146
            if (artist)
                track.artists = [artist]
            if (album)
                track.album = album

            await trackRepository.save(track)
        }
    }
}
