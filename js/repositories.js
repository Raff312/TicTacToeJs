export class GamesRepository {
    #db;

    async init() {
        this.#db = await idb.openDB("games", 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains('gamesInfo')) {
                    db.createObjectStore('gamesInfo', { keyPath: 'id', autoIncrement: true });
                }
            }
        });
    }

    async add(board, winnerMarkup, xCoords, oCoords, playerName) {
        await this.#db.add('gamesInfo', {
            sizeBoard: board.getDimension(),
            gameDate: (new Date()).toLocaleString(),
            playerName: playerName,
            playerMarkup: board.getUserMarkup(),
            winnerMarkup: winnerMarkup,
            xCoords: xCoords,
            oCoords: oCoords
        });
    }

    async getAll() {
        return await this.#db.getAll('gamesInfo');
    }

    async getById(id) {
        return await this.#db.get('gamesInfo', id)
    }

}
