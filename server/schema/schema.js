const graphql = require('graphql');

const Post = require('../models/post');
const Location = require('../models/location');
const Style = require('../models/style');
const Artist = require('../models/artist');
const TagInstance = require('../models/tagInstance');
const Photo = require('../models/photo');

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const StyleType = new GraphQLObjectType({
    name: 'Style',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        tags: {
            type: GraphQLList(TagInstanceType),
            resolve(parent, args) {
                return TagInstance.find({styleIds: parent.id});
            }
        }        
    })
});

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        aliases: {type: GraphQLList(GraphQLString)},
        origin: {type: GraphQLString},
        tags: {
            type: GraphQLList(TagInstanceType),
            resolve(parent, args) {
                return TagInstance.find({artistId: parent.id});
            }
        }
    })
});

const TagInstanceType = new GraphQLObjectType({
    name: 'TagInstance',
    fields: () => ({
        id: {type: GraphQLID},
        artistId: {type: GraphQLString},
        styleIds: {type: GraphQLList(GraphQLString)},
        photoCoords: {type: GraphQLString},
        photos: {
            type: GraphQLList(PhotoType),
            resolve(parent, args) {
                return Photo.find({function(currPhoto) {
                    return currPhoto.tagInstanceIds.includes(parent.id);
                }});
            }
        }
    })
});

const PhotoType = new GraphQLObjectType({
    name: 'Photo',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        timeStamp: {type: GraphQLInt},
        locationId: {type: GraphQLString},
        tagInstanceIds: {type: GraphQLList(GraphQLString)},
        imageUrl: {type: GraphQLString},
        contributor: {type: GraphQLString},
        postId: {type: GraphQLString}
    })
});

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        geoTag: {type: GraphQLString},
        photos: {
            type: GraphQLList(PhotoType),
            resolve(parent, args) {
                return Photo.find({locationId: parent.id});
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        timeStamp: {type: GraphQLInt},
        photos: {
            type: GraphQLList(PhotoType),
            resolve(parent, args) {
                return Photo.find({postId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        style: {
            type: StyleType,
            resolve(parent, args) {
                return Style.findById(args.id);
            }
        },
        styles: {
            type: new GraphQLList(StyleType),
            resolve(parent, args) {
                return Style.find({});
            }
        },
        artist: {
            type: ArtistType,
            resolve(parent, args) {
                return Artist.findById(args.id);
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve(parent, args) {
                return Artist.find({});
            }
        },
        post: {
            type: PostType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args) {
                return Post.findById(args.id);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({});
            }
        },
        location: {
            type: LocationType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Location.findById(args.id);
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            resolve(parent, args) {
                return Location.find({});
            }
        }
    }
});

const USER_NAME = 'Test User';

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStyle: {
            type: StyleType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let style = new Style({
                    name: args.name,
                    description: args.description
                });

                return style.save();
            }
        },
        addArtist: {
            type: ArtistType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                aliases: {type: GraphQLList(GraphQLString)},
                origin: {type: GraphQLString}
            },
            resolve(parent, args) {
                let artist = new Artist({
                    name: args.name,
                    aliases: args.aliases,
                    origin: args.origin
                });

                return artist.save();
            }
        },
        addLocation: {
            type: LocationType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                geoTag: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let location = new Location({
                    title: args.title,
                    geoTag: args.geoTag
                });

                return location.save();
            }
        },
        addTagInstance: {
            type: TagInstanceType,
            args: {
                artistId: {type: GraphQLString},
                styleIds: {type: GraphQLList(GraphQLString)},
                photoCoords: {type: GraphQLString}
            },
            resolve(parent, args) {
                let tagInstance = new TagInstance({
                    artistId: args.artistId,
                    styleIds: args.styleIds,
                    photoCoords: args.photoCoords
                });

                return tagInstance.save();
            }
        },
        addPhoto: {
            type: PhotoType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
                locationId: {type: new GraphQLNonNull(GraphQLString)},
                tagInstanceIds: {type: new GraphQLNonNull(GraphQLList(GraphQLString))},
                imageUrl: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let photo = new Photo({
                    title: args.title,
                    description: args.description,
                    timeStamp: Date.now(),
                    locationId: args.locationId,
                    tagInstanceIds: args.tagInstanceIds,
                    imageUrl: args.imageUrl,
                    contributor: USER_NAME
                });

                return photo.save();
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let post = new Post({
                    title: args.title,
                    content: args.content,
                    timeStamp: Date.now()
                });

                return post.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});