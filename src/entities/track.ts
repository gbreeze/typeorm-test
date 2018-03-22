import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Album } from './album'
import { Artist } from './artist'

@Entity()
export class Track
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public hash: string

    @Column()
    public title: string

    @Column()
    public duration: number

    @Column({ nullable: true })
    public fileSize: number

    @Column({ nullable: true })
    public disc: number

    @Column({ nullable: true })
    public number: number

    @Column({ unique: true })
    public filePath: string

    @Column({ nullable: true })
    public coverArt: string

    /** ReleaseDate replaces the year */
    @Column({ nullable: true })
    public releaseDate: Date

    @Column({ nullable: true })
    public genre: string

    // public sampleFrequency: number
    // public bitsPerSample: number

    @Column({ nullable: true })
    public bitrate: number

    // ratings

    @Column({ nullable: true })
    public rating: number

    @Column({ nullable: true })
    public marked: boolean

    // foreign keys

    @ManyToOne(type => Album, album => album.tracks, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: false        
    })
    public album: Album

    @ManyToMany(type => Artist, artist => artist.albums, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    public artists: Artist[]
}
