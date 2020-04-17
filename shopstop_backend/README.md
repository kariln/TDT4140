# ShopStop Backend API

Production API: https://shopstop.xyz/

Staging API: https://staging.shopstop.xyz/

## Token

Token verification. Used when logging in.

- #### URL

  `/token/`

- #### Methods

  `POST`

- #### Token

  Not required

- #### Body parameters

  `{ "username": "myUsername", "password": "myPassword" }`

- #### Response

  - Success Code: 200
  - Data: { token: usersToken }

- #### Action URLs

  None

- #### Example javascript usage

```javascript
// Get the token corresponding to a user
fetch(`https://shopstop.xyz/token/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ username: "myUsername", password: "myPassword" })
});
```

## User

Used when creating a new user.

- #### URL

  `/users/`

- #### Methods

  `POST`

- #### Token

  Not required

- #### Body parameters

  `{ "username": "myUsername", "password": "myPassword", "email": "email@email.com" }`

- #### Response

  - Success Code: 201

- #### Action URLs

  None

- #### Example javascript usage

```javascript
// Create a new user
fetch(`https://shopstop.xyz/users/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: "myUsername",
    password: "myPassword",
    email: "email@email.com"
  })
});
```

## Groups

- #### URL

  `/groups/`

- #### Methods

  `GET` `POST` `PATCH` `DELETE`

- #### Token

  Required

- #### Action URLs

  `/current_invited_user_groups/`

  `/current_user_groups/`

  `/:id/add_current_user_to_group`

  `/:id/decline_group_invitation`

  `/:id/invite_user_to_group`

  `/:id/remove_current_user_from_group`

- #### Example javascript usage

```javascript
// Get all groups the user is part of
fetch(`https://shopstop.xyz/groups/current_user_groups/`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${myToken}`
  }
});

// Create a new group
fetch(`https://shopstop.xyz/groups/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${myToken}`
  },
  body: JSON.stringify({ name: myNewGroupName })
});
```

## Lists

- #### URL

  `/lists/`

- #### Methods

  `GET` `POST` `PATCH` `DELETE`

- #### Token

  Required

- #### Action URLs

  `/list_by_group/`

- #### Example javascript usage

```javascript
// Get all lists that belongs to a specific group
fetch(`https://shopstop.xyz/lists/list_by_group/?group=${myGroup}/`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${myToken}`
  }
});

// Delete a list
fetch(`https://shopstop.xyz/lists/${myList}/`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${myToken}`
  }
});
```

## List Items

- #### URL

  `/list-items/`

- #### Methods

  `GET` `POST` `PATCH` `DELETE`

- #### Token

  Required

- #### Action URLs

  `/list_items_by_list/`

- #### Example javascript usage

```javascript
// Get all list items that belongs to a specific list
fetch(`https://shopstop.xyz/list-items/list_items_by_list/?list=${myList}/`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${myToken}`
  }
});

// Change a list item
fetch(`https://shopstop.xyz/list-items/${myListItem}/`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${myToken}`
  },
  body: JSON.stringify({ name: newName, quantity: newQuantity })
});
```
