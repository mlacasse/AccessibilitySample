const INITIAL_STATE = {
  posters: [
    {
      id: '802f0da9-7a1a-4139-a228-cce59aa13e23',
      uri: 'res://drawable/default/2x3-DinoWorld.png',
      title: 'Dino World'
    },
    {
      id: 'fe109698-ae82-48d8-b466-d64d6fc0372b',
      uri: 'res://drawable/default/2x3-FairyTales.png',
      title: 'Fairy Tales'
    },
    {
      id: '3450fed0-85ef-4b3b-b7a9-11336ecf4870',
      uri: 'res://drawable/default/2x3-Hero.png',
      title: 'Hero'
    },
    {
      id: '7fb596b2-e1fb-4832-b299-497fc871b4c5',
      uri: 'res://drawable/default/2x3-Maze.png',
      title: 'Maze'
    },
    {
      id: '83a379cd-e64b-4efd-87c1-fd54a1ee448d',
      uri: 'res://drawable/default/2x3-Orbit.png',
      title: 'Orbit'
    },
    {
      id: '4bca4ddd-08f7-4a70-9438-ff568e828c49',
      uri: 'res://drawable/default/2x3-Pink.png',
      title: 'Pink'
    },
    {
      id: '5ddb08b3-c3ed-4e27-b59f-0203213dc4b7',
      uri: 'res://drawable/default/2x3-RoadTrip.png',
      title: 'Road Trip'
    },
    {
      id: '3c46d016-76f4-4840-90bd-e0b3032c8237',
      uri: 'res://drawable/default/2x3-Stage.png',
      title: 'Stage'
    },
    {
      id: '8c668f1b-a876-4dea-ba5f-13fc69ee6623',
      uri: 'res://drawable/default/2x3-Stranded.png',
      title: 'Stranded'
    },
    {
      id: 'a4c4c6ef-5ddf-4de2-abfa-381cc9670fba',
      uri: 'res://drawable/default/2x3-Valera.png',
      title: 'Valera'
    },
  ],
  landscapes: [
    {
      id: '132e0ce4-082c-46a4-a8ea-626d954863e2',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2030.jpg?alt=media&token=132e0ce4-082c-46a4-a8ea-626d954863e2',
      title: 'This is a lake'
    },
    {
      id: 'a9c45bf1-8830-4be5-834a-00bb5afb609f',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2018.jpg?alt=media&token=a9c45bf1-8830-4be5-834a-00bb5afb609f',
      title: 'Britannia'
    },
    {
      id: 'a2653d69-1f1e-4063-a541-a1f0d95d7e55',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2022.jpg?alt=media&token=a2653d69-1f1e-4063-a541-a1f0d95d7e55',
      title: 'Bricks'
    },
    {
      id: 'ec755530-08f3-49b4-ad26-fa3d3108b3e4',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_1901.jpg?alt=media&token=ec755530-08f3-49b4-ad26-fa3d3108b3e4',
      title: 'A fixed fence'
    },
    {
      id: '1a4a17ee-8ed9-4716-a424-3c0e00349ad9',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2024.jpg?alt=media&token=1a4a17ee-8ed9-4716-a424-3c0e00349ad9',
      title: 'Calm Waters'
    },
    {
      id: '3c8fd344-650f-44f1-a5d6-38c639b70717',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/creepy.jpg?alt=media&token=3c8fd344-650f-44f1-a5d6-38c639b70717',
      title: 'A spooky cottage'
    },
    {
      id: '024ad282-3af7-47e6-ba89-3b26b9cd4f92',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2067.jpg?alt=media&token=024ad282-3af7-47e6-ba89-3b26b9cd4f92',
      title: 'Nothing but salad'
    },
    {
      id: '68ce0e5c-5ef7-418f-b56d-79526786902e',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2127.jpg?alt=media&token=68ce0e5c-5ef7-418f-b56d-79526786902e',
      title: 'Car drives itself'
    },
    {
      id: '0158f55f-3427-49c9-aa91-098b94891f2f',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2057.jpg?alt=media&token=0158f55f-3427-49c9-aa91-098b94891f2f',
      title: 'Howdy do'
    },
    {
      id: '21297780-8ccc-4bcd-a9d5-a528bc049447',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_1968.jpg?alt=media&token=21297780-8ccc-4bcd-a9d5-a528bc049447',
      title: 'Midlife Crisis'
    },
    {
      id: '280532e8-f0d4-4eeb-bd94-1bbaaa4dccff',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2082.jpg?alt=media&token=280532e8-f0d4-4eeb-bd94-1bbaaa4dccff',
      title: 'Bye New York'
    },
    {
      id: 'ecd362f8-fcd0-4a14-a7ac-362cc6842b58',
      uri: 'https://firebasestorage.googleapis.com/v0/b/sampleyoui.appspot.com/o/IMG_2124.jpg?alt=media&token=ecd362f8-fcd0-4a14-a7ac-362cc6842b58',
      title: 'Ferris Wheel Mayhem'
    },
  ],
  blurry: [
    {
      id: '802f0da9-7a1a-4139-a228-cce59aa13e23',
      uri: 'res://drawable/default/16x9-DinoWorld.png',
      title: 'Dino World'
    },
    {
      id: 'fe109698-ae82-48d8-b466-d64d6fc0372b',
      uri: 'res://drawable/default/16x9-FairyTales.png',
      title: 'Fairy Tales'
    },
    {
      id: '3450fed0-85ef-4b3b-b7a9-11336ecf4870',
      uri: 'res://drawable/default/16x9-Hero.png',
      title: 'Hero'
    },
    {
      id: '7fb596b2-e1fb-4832-b299-497fc871b4c5',
      uri: 'res://drawable/default/16x9-Maze.png',
      title: 'Maze'
    },
    {
      id: '83a379cd-e64b-4efd-87c1-fd54a1ee448d',
      uri: 'res://drawable/default/16x9-Orbit.png',
      title: 'Orbit'
    },
    {
      id: '4bca4ddd-08f7-4a70-9438-ff568e828c49',
      uri: 'res://drawable/default/16x9-Pink.png',
      title: 'Pink'
    },
    {
      id: '5ddb08b3-c3ed-4e27-b59f-0203213dc4b7',
      uri: 'res://drawable/default/16x9-RoadTrip.png',
      title: 'Road Trip'
    },
    {
      id: '3c46d016-76f4-4840-90bd-e0b3032c8237',
      uri: 'res://drawable/default/16x9-Stage.png',
      title: 'Stage'
    },
    {
      id: '8c668f1b-a876-4dea-ba5f-13fc69ee6623',
      uri: 'res://drawable/default/16x9-Stranded.png',
      title: 'Stranded'
    },
    {
      id: 'a4c4c6ef-5ddf-4de2-abfa-381cc9670fba',
      uri: 'res://drawable/default/16x9-Valera.png',
      title: 'Valera'
    },
  ],
};

export default (state = INITIAL_STATE, action) => {
  return state;
};