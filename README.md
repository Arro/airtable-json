airtable-json
=============

Motivation
----------

When you want Airtable records to be in a raw json format, and that's all you care about.



Usage
-----
```
import airtableJson from 'airtable-json'

const getStuff = async() => {
  const songs = await airtableJson({
    auth_key,
    base_name,
    primary: 'Songs',
    view: 'Main'
  })

  console.log(songs)

}
```

will result in something like:

```
[
  {
    URL: 'https://soundcloud.com/bkayeofficial/post-malone-im-gonna-be-bkaye-remix',
    'Discovery Date': '2019-10-04',
    BPM: 64,
    Key: '12d',
    Artists: [ 'reca9IDlX0gvu32ml' ],
    'Added Date': '2019-10-12T15:43:00.000Z',
    Title: "I'm Gonna Be",
    Remixers: [ 'recCe40NX0vOrQ1iK' ],
    Length: '3:22',
    __id: 'recXq4opAEsHJ6ogv'
  },
  {
    URL: 'https://www.youtube.com/watch?v=ccbcRGGtqI4',
    'Discovery Date': '2019-09-11',
    BPM: 123,
    Key: '11m',
    Artists: [ 'recgh3XeMcdmX8uPj' ],
    'Added Date': '2019-10-17T13:51:00.000Z',
    Title: 'Stop Being Yourself',
    Length: '4:10',
    __id: 'recYVpvqG0gRPJ7Kk'
  },
  {
    URL: 'https://www.youtube.com/watch?v=lWSMN6nKrc8',
    'Discovery Date': '2019-09-09',
    BPM: 80,
    Key: '2m',
    Artists: [ 'reczBZBWZG06DOsCO', 'recXvnMcZKmxyBtUi' ],
    'Added Date': '2019-10-17T13:53:00.000Z',
    Title: 'Electric Hearts',
    Length: '2:40',
    __id: 'recSdySY5DFgI46Vx'
  }
]
```


But wait, there's more!
=======================

If your records have references to other tables in the same base, you can get a nice clean json blob with that data included.

```
const getStuff = async() => {
  const songs = await airtableJson({
    auth_key,
    base_name,
    primary: 'Songs',
    view: 'Main View',
    populate: [{
      local: "Artists",
      other: "Artists"
    }, {
      local: "Remixers",
      other: "Artists"
    }]
  })

  console.log(songs)
}
```

will result in something like this:

```
[
  {
    "URL": "https://soundcloud.com/bkayeofficial/post-malone-im-gonna-be-bkaye-remix",
    "Discovery Date": "2019-10-04",
    "BPM": 64,
    "Key": "12d",
    "Artists": [
      {
        "Name": "Post Malone",
        "SoundCloud": "https://soundcloud.com/postmalone",
        "__id": "reca9IDlX0gvu32ml"
      }
    ],
    "Added Date": "2019-10-12T15:43:00.000Z",
    "Title": "I'm Gonna Be",
    "Remixers": [
      {
        "Name": "BKAYE",
        "SoundCloud": "https://soundcloud.com/bkayeofficial",
        "__id": "recCe40NX0vOrQ1iK"
      }
    ],
    "Length": "3:22",
    "__id": "recXq4opAEsHJ6ogv"
  },
  {
    "URL": "https://www.youtube.com/watch?v=ccbcRGGtqI4",
    "Discovery Date": "2019-09-11",
    "BPM": 123,
    "Key": "11m",
    "Artists": [
      {
        "Name": "Felix Cartal",
        "SoundCloud": "https://soundcloud.com/felixcartal",
        "__id": "recgh3XeMcdmX8uPj"
      }
    ],
    "Added Date": "2019-10-17T13:51:00.000Z",
    "Title": "Stop Being Yourself",
    "Length": "4:10",
    "__id": "recYVpvqG0gRPJ7Kk"
  },
  {
    "URL": "https://www.youtube.com/watch?v=lWSMN6nKrc8",
    "Discovery Date": "2019-09-09",
    "BPM": 80,
    "Key": "2m",
    "Artists": [
      {
        "Name": "BEAUZ",
        "SoundCloud": "https://soundcloud.com/beauzmusic",
        "__id": "reczBZBWZG06DOsCO"
      },
      {
        "Name": "Luke Anders",
        "SoundCloud": "https://soundcloud.com/lukeandersmusic",
        "__id": "recXvnMcZKmxyBtUi"
      }
    ],
    "Added Date": "2019-10-17T13:53:00.000Z",
    "Title": "Electric Hearts",
    "Length": "2:40",
    "__id": "recSdySY5DFgI46Vx"
  }
]
```









