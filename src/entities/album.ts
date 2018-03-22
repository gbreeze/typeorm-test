import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Artist } from './artist'
import { Track } from './track'

@Entity()
export class Album
{
    @PrimaryGeneratedColumn()
    public id: number

    @Column({ unique: true })
    public hash: string

    @Column({ unique: true })
    public name: string

    /** ReleaseDate replaces the year */
    @Column({ nullable: true })
    public releaseDate: Date

    @Column({ nullable: true })
    public genre: string

    @Column({ nullable: true })
    public coverArt: string

    // ratings

    @Column({ nullable: true })
    public rating: number

    @Column({ nullable: true })
    public marked: boolean

    // http://typeorm.io/#/many-to-many-relations

    @OneToMany(type => Track, track => track.album, {
        cascadeInsert: true,
        cascadeUpdate: true        
    })
    // @JoinTable()
    public tracks: Track[]

    @ManyToMany(type => Artist, artist => artist.albums, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    public artists: Artist[]
}
