import { Request, Response } from 'express';

jest.mock('../../../services/authService', () => ({
    authService: {
        registerUser: jest.fn(),
        login: jest.fn(),
        verifyAuth: jest.fn(),
    },
}));

import { authController } from '../../../controllers/authController';
import { authService } from '../../../services/authService';

type ResMock = Partial<Response> & {
    status: jest.Mock;
    json: jest.Mock;
    setHeader: jest.Mock;
    send: jest.Mock;
};

const makeRes = (): ResMock => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const makeUser = (overrides: Partial<any> = {}) => ({
    id: 1,
    email: 'mario.rossi@example.com',
    username: 'mrossi',
    firstName: 'Mario',
    lastName: 'Rossi',
    password: 'hashed',
    ...overrides,
});

describe('authController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ---------- register ----------
    describe('register', () => {
        it('returns 201, sets Location, and returns { user, token }', async () => {
            const req = {
                body: {
                    email: 'mario.rossi@example.com',
                    username: 'mrossi',
                    firstName: 'Mario',
                    lastName: 'Rossi',
                    password: 'plain',
                },
            } as unknown as Request;
            const res = makeRes();

            const created = makeUser();
            (authService.registerUser as jest.Mock).mockResolvedValue({
                user: created,
                token: 'jwt-123',
            });

            await authController.register(req, res as unknown as Response);

            expect(authService.registerUser).toHaveBeenCalledWith(
                'mario.rossi@example.com',
                'mrossi',
                'Mario',
                'Rossi',
                'plain'
            );
            expect(res.setHeader).toHaveBeenCalledWith('Location', '/reports');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ user: created, token: 'jwt-123' });
        });

        it('returns 409 when email is already in use', async () => {
            const req = {
                body: { email: 'e@e.com', username: 'u', firstName: 'F', lastName: 'L', password: 'p' },
            } as unknown as Request;
            const res = makeRes();

            (authService.registerUser as jest.Mock).mockRejectedValue(
                new Error('Email is already in use')
            );

            await authController.register(req, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Conflict Error',
                message: 'Email is already in use',
            });
        });

        it('returns 409 when username is already in use', async () => {
            const req = {
                body: { email: 'e@e.com', username: 'u', firstName: 'F', lastName: 'L', password: 'p' },
            } as unknown as Request;
            const res = makeRes();

            (authService.registerUser as jest.Mock).mockRejectedValue(
                new Error('Username is already in use')
            );

            await authController.register(req, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Conflict Error',
                message: 'Username is already in use',
            });
        });

        it('returns 400 for other errors', async () => {
            const req = {
                body: { email: 'e@e.com', username: 'u', firstName: 'F', lastName: 'L', password: 'p' },
            } as unknown as Request;
            const res = makeRes();

            (authService.registerUser as jest.Mock).mockRejectedValue(new Error('boom'));

            await authController.register(req, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Bad Request',
                message: 'boom',
            });
        });
    });

    // ---------- login ----------
    describe('login', () => {
        it('returns 200, sets Set-Cookie and Location, and returns the user', async () => {
            const req = {
                body: { identifier: 'mrossi', password: 'plain' },
            } as unknown as Request;
            const res = makeRes();

            const user = makeUser();
            (authService.login as jest.Mock).mockResolvedValue({ user, token: 'jwt-abc' });

            await authController.login(req, res as unknown as Response);

            expect(authService.login).toHaveBeenCalledWith('mrossi', 'plain');
            expect(res.setHeader).toHaveBeenCalledWith('Set-Cookie', 'authToken=jwt-abc');
            expect(res.setHeader).toHaveBeenCalledWith('Location', '/reports');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        });

        it('returns 401 on authentication errors', async () => {
            const req = {
                body: { identifier: 'mrossi', password: 'wrong' },
            } as unknown as Request;
            const res = makeRes();

            (authService.login as jest.Mock).mockRejectedValue(new Error('Invalid password'));

            await authController.login(req, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Authentication Error',
                message: 'Invalid password',
            });
        });
    });

    // ---------- verifyAuth ----------
    describe('verifyAuth', () => {
        it('returns 200 and the user on success', async () => {
            const user = makeUser({ id: 7 });
            const req = { cookies: { authToken: 'ok' } } as unknown as Request;
            const res = makeRes();

            (authService.verifyAuth as jest.Mock).mockResolvedValue(user);

            await authController.verifyAuth(req, res as unknown as Response);

            expect(authService.verifyAuth).toHaveBeenCalledWith(req);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        });

        it('returns 401 on verification error', async () => {
            const req = { cookies: { authToken: 'bad' } } as unknown as Request;
            const res = makeRes();

            (authService.verifyAuth as jest.Mock).mockRejectedValue(
                new Error('Invalid or expired token')
            );

            await authController.verifyAuth(req, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Authentication Error',
                message: 'Invalid or expired token',
            });
        });
    });

    // ---------- logout ----------
    describe('logout', () => {
        it('clears cookie and returns 204', async () => {
            const req = {} as unknown as Request;
            const res = makeRes();

            await authController.logout(req, res as unknown as Response);

            expect(res.setHeader).toHaveBeenCalledWith(
                'Set-Cookie',
                'authToken=; HttpOnly; Max-Age=0'
            );
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
