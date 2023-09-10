import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
];

const postIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
];

export const users = [
    {
        _id: userIds[0],
        username: 'foo',
        email: 'foo@test.com',
        pw_hash: 'foo1_pw_hash',
        name: 'Foo',
        bio: 'My name is Foo!',
        location: 'Pittsburgh, PA',
        followers: [userIds[2], userIds[3]],
        following: [userIds[1], userIds[2], userIds[3]],
        posts: [postIds[2], postIds[4], postIds[7]],
        liked_posts: [postIds[0], postIds[1], postIds[5], postIds[6]],
        replies: [postIds[2], postIds[7]],
        picture_path: 'leilani-angel-K84vnnzxmTQ-unsplash.jpg'
    },
    {
        _id: userIds[1],
        username: 'bar',
        email: 'bar@test.com',
        pw_hash: 'bar1_pw_hash',
        name: 'Bar',
        bio: 'Coffee enjoyer',
        location: '',
        followers: [userIds[0], userIds[2]],
        following: [userIds[2]],
        posts: [postIds[0], postIds[3]],
        liked_posts: [postIds[1], postIds[4]],
        replies: [postIds[3]],
        picture_path: 'jake-nackos-IF9TK5Uy-KI-unsplash.jpg'
    },
    {
        _id: userIds[2],
        username: 'baz',
        email: 'baz@test.com',
        pw_hash: 'baz1_pw_hash',
        name: 'Baz',
        bio: '',
        location: 'Philadelphia, PA',
        followers: [userIds[0], userIds[1], userIds[3]],
        following: [userIds[0], userIds[1]],
        posts: [postIds[1], postIds[5]],
        liked_posts: [postIds[0], postIds[4]],
        replies: [postIds[5]],
        picture_path: 'sigmund-jzz_3jWMzHA-unsplash.jpg'
    },
    {
        _id: userIds[3],
        username: 'bat',
        email: 'bat@test.com',
        pw_hash: 'bat1_pw_hash',
        name: 'Bat',
        bio: '',
        location: 'Pittsburgh, PA',
        followers: [userIds[0]],
        following: [userIds[0], userIds[2]],
        posts: [postIds[6]],
        liked_posts: [postIds[4]],
        replies: [],
        picture_path: 'diego-hernandez-MSepzbKFz10-unsplash.jpg'
    }
]


export const posts = [
    {
        _id: postIds[0],
        public: true,
        author: userIds[1],
        body: 'It is too #hot outside!!',
        tags: ['hot'],
        likes: [userIds[0], userIds[2]],
        replies: [],
        picture_path: '',
    },
    {
        _id: postIds[1],
        public: true,
        author: userIds[2],
        body: 'Going to my first #football game today!',
        tags: ['football'],
        likes: [userIds[0], userIds[1]],
        replies: [postIds[2], postIds[3]],
        picture_path: '',
    },
    {
        _id: postIds[2],
        public: true,
        author: userIds[0],
        body: "Who's playing?",
        tags: [],
        likes: [],
        replies: [],
        picture_path: '',
        root: postIds[1]
    },
    {
        _id: postIds[3],
        public: true,
        author: userIds[1],
        body: 'Sounds like fun!',
        tags: [],
        likes: [],
        replies: [],
        picture_path: '',
        root: postIds[1]
    },
    {
        _id: postIds[4],
        public: true,
        author: userIds[0],
        body: 'Say hello to my new #cat',
        tags: ['cat'],
        likes: [userIds[1], userIds[2], userIds[3]],
        replies: [postIds[5]],
        picture_path: 'IMG_9189.jpg',
    },
    {
        _id: postIds[5],
        public: true,
        author: userIds[2],
        body: 'So cute!!',
        tags: [],
        likes: [userIds[0]],
        replies: [],
        picture_path: '',
        root: postIds[4]
    },
    {
        _id: postIds[6],
        public: true,
        author: userIds[3],
        body: "Just got back from my trip. Who's around?",
        tags: [],
        likes: [userIds[0]],
        replies: [postIds[7]],
        picture_path: '',
    },
    {
        _id: postIds[7],
        public: true,
        author: userIds[0],
        body: '@bar and I are!',
        tags: [],
        likes: [],
        replies: [],
        picture_path: '',
        root: postIds[6]
    },
]