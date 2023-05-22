# Data models

```js
user = {
  name: 'Bob',
  birth: Date,
  favoriteGames: [
    {
      id: 1367,
      name: 'Kerbal Space Progra',
    },
    {
      id: 76543,
      name: 'Portal 2'
    }
  ]
}
user = {
  name: 'Alice',
  birth: Date,
  favoriteGames: [
    {
      id: 1367,
      name: 'Kerbal Space Program',
    },
    {
      id: 76543,
      name: 'Portal 2'
    },
    ...
  ]
}
```

## Linking collections:

```js
users = [
	{
		id: 12353,
		name: "Bob",
		birth: Date,
		password: "SRTH3R33I,939523HFOEFHZEHF359237",
		// favoriteGames: [76542, 24568, 964325],
	},
	{
		id: 12355,
		name: "Alice",
		birth: Date,
		password: "SRTH3R33,I939523HFOEFHZEHF359237",
		// favoriteGames: [1367, 76543, 76423],
	},
];

messages = [
	{
		id: 8765427,
		senderId: 12353,
		recipientId: 12355,
		content: "Well hello there!",
		timestamp: Date,
	},
];

favorites = [
	{
		id: 098765267,
		user: 12355,
		game: 76543,
	},
	{
		id: 24688522,
		user: 12355,
		game: 95673,
	},
	{
		id: 2436248356,
		user: 267853,
		game: 865275,
	},
];

games = [
	{
		id: 76542,
		name: "KERBAL",
	},
	{
		id: 98765,
		name: "Portal",
	},
	{
		id: 134567,
		name: "The Sims",
		cheatCode: "rosebud -> give 1000$",
	},
];
```

### One to one relationship

ie: User <-> Personal Profil / CC infos

### One to many relationship

User : Many messages

### Many to many relationship

User -> Many Favourites - Game -> Favorited by many users

### One to squillions
