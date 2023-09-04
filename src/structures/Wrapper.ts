import axios from "axios";
import { change, changeType, connection } from "../typings/params";
import { changeBody, receiveCallback } from '../typings/configs'
import express from 'express'

export class Wrapper {
    private port: string;
    private id: string
    private api: string;
    private app = express()
    private _onReceive: receiveCallback;

    constructor(data: connection & { apiPort: string; }) {
        this.port = data.port;
        this.id = data.id
        this.api = data.apiPort;

        this.start()
    }

    public onReceive(callback: receiveCallback) {
        this._onReceive = callback;
        return this
    }
    public async update<T extends changeType>(type: T, change: Omit<change<T>, 'emitterId'>) {
        try {
            return await axios.post(`http://localhost:${this.api}/config-edit`, {
                change: {
                    ...change,
                    emitterId: this.id
                },
                emitterId: this.id,
                type
            });
        } catch { }
    }
    private listen() {
        this.app.post('/config-edit', (req, res) => {
            const body = req.body as changeBody<changeType>;
            if (!!this._onReceive) this._onReceive(body.type, body.change)

            res.send({
                ok: true,
                code: 200,
                message: 'received'
            })
        })
    }
    private register() {
        axios.post(`http://localhost:${this.api}/register`, {
            id: this.id,
            port: this.port
        }, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    public unregister() {
        axios.post(`http://localhost:${this.api}/unregister`, {
            id: this.id,
            port: this.port
        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).catch(() => {})
    }
    private start() {
        this.register();
        
        this.app.use(express.json());

        this.app.listen(this.port, () => {
            console.log(`Interface running on port ${this.port}`)
        })
        this.listen();
    }
}