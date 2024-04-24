Wallet API
=========================

This API allows you to manage wallets and perform transactions.

Getting Started
---------------

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installing

1. Clone the repository:

   ```
   git clone https://github.com/yashodharNellorepalli/wallet_express_app.git
   ```

2. Install dependencies:

   ```
   npm install -g nodemon
   npm install
   ```

3. Start the server:

   ```
   npm start
   ```

API Endpoints
-------------

### 1. Initialize wallet

#### POST /setup

Initializes a new wallet with the specified balance and name.

##### Request

- `balance`: The initial balance of the wallet.
- `name`: The name of the wallet.

##### Response

- `id`: The unique identifier of the wallet.
- `balance`: The current balance of the wallet.
- `name`: The name of the wallet.
- `date`: The date and time when the wallet was created.

##### Example

###### Request

```json
{
  "balance": 10,
  "name": "Wallet A"
}
```

###### Response

```json
{
  "id": "6628d55ffa48c3c3f5b44abe",
  "balance": 10,
  "name": "Wallet A",
  "date": "2023-03-22T14:45:26.789Z"
}
```

### 2. Credit/Debit amount

#### POST /transact/:walletId

Credits or debits the specified amount to the wallet with the given ID.

##### Request

- `walletId`: The unique identifier of the wallet.
- `amount`: The amount to be credited or debited.
- `description`: A description of the transaction.

##### Response

- `balance`: The current balance of the wallet.
- `transactionId`: The unique identifier of the transaction.

##### Example

###### Request

```json
{
  "amount": 2.4,
  "description": "Recharge"
}
```

###### Response

```json
{
  "balance": 12.4,
  "transactionId": "6628d55ffa48c3c3f5b44abe"
}
```

### 3. Fetch transactions

#### GET /transactions?walletId={walletId}&skip={skip}&limit={limit}

Fetches the recent transactions on the wallet with the given ID.

##### Request

- `walletId`: The unique identifier of the wallet.
- `skip`: The number of transactions to skip.
- `limit`: The maximum number of transactions to return.

##### Response

- `id`: The unique identifier of the transaction.
- `walletId`: The unique identifier of the wallet.
- `amount`: The amount of the transaction.
- `balance`: The balance of the wallet after the transaction.
- `description`: The description of the transaction.
- `date`: The date and time of the transaction.
- `type`: The type of transaction (`CREDIT` or `DEBIT`).

##### Example

###### Request

```
GET /transactions?walletId=1243434&skip=0&limit=10
```

###### Response

```json
[
  {
    "id": "343434",
    "walletId": "1243434",
    "amount": 2.4,
    "balance": 12.4,
    "description": "Recharge",
    "date": "2023-03-22T14:45:26.789Z",
    "type": "CREDIT"
  },
  {
    "id": "544521",
    "walletId": "1243434",
    "amount": 10,
    "balance": 10,
    "description": "Setup",
    "date": "2023-03-22T14:45:26.789Z",
    "type": "CREDIT"
  }
]
```

### 4. Get wallet

#### GET /wallet/:id

Fetches the details of the wallet with the given ID.

##### Request

- `id`: The unique identifier of the wallet.

##### Response

- `id`: The unique identifier of the wallet.
- `balance`: The current balance of the wallet.
- `name`: The name of the wallet.
- `date`: The date and time when the wallet was created.

##### Example

###### Request

```
GET /wallet/1243434
```

###### Response

```json
{
  "id": "1243434",
  "balance": 12.4,
  "name": "Wallet A",
  "date": "2023-03-22T14:45:26.789Z"
}
```

Running the tests
-----------------

To run the tests, execute the following command:

```
npm test
```

Deployment
----------

To deploy the application, follow these steps:

1. Build the application:

   ```
   npm run build
   ```

2. Deploy the built files to your hosting service.

Built With
----------

- [Node.js](https://nodejs.org/) - The JavaScript runtime.
- [Express](https://expressjs.com/) - The web framework.
- [MongoDB](https://www.mongodb.com/) - The database.

Authors
-------

- **Yashodhar** - [GitHub](https://github.com/yashodharNellorepalli)