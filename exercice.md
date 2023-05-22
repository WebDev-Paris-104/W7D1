## Spotify

### User

- id
- username
- email
- phoneN
- paymentMetyhod

### Artist

- id
- name
- monthlyListeners
<!-- - albumId (foreign key)
- songId (foreign key) -->

### Song

- id
- name
- year
- [artistId (foreign key)]
- [genreId (foreign key)]
- albumId

### Favorite

- id
- userId
- artistId
- songId
- albumId

### Albums

- id
- name
<!-- - songId -->
- [artistId]

### Genre

- id
- name

// More complex example:

```js
// We want all of the songs of "Prince" which are "EDM"
// Get Prince
const prince = Artist.find({ name: "Prince" });
const edm = Genre.find({ name: "EDM" });

const allSongs = Songs.find({
	$and: [{ artistId: { $in: [prince._id] } }, { genre: { $in: [edm._id] } }],
});
```
