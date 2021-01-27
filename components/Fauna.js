const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const getUsers = async () => {
    const { data } = await faunaClient.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('users'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
        )
    );
    const users = data.map((user) => {
        user.id = user.ref.id;
        delete user.ref;
        return user;
    });

    return users;
};

const getUserById = async (id) => {
    const user = await faunaClient.query(
        q.Get(q.Ref(q.Collection('users'), id))
    );
    user.id = user.ref.id;
    delete user.ref;
    return user;
};

const getUserByEmail = async (email) => {
    const user = await faunaClient.query(
        q.Get(q.Collection('users'), email)
    );
    user.email = user.email;
    return user;
};

const createUser = async ( authid, email, userrname ) => {
    return await faunaClient.query(
        q.Create(q.Collection('users'), {
            data: { 'authid':authid, 'email':email, 'userid':userrname },
        })
    );
};

const updateUser = async ( id ) => {
    return await faunaClient.query(
        q.Update(q.Ref(q.Collection('users'), id), {
            data: { id },
        })
    );
};

const deleteUser = async (id) => {
    return await faunaClient.query(
        q.Delete(q.Ref(q.Collection('users'), id))
    );
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
};
