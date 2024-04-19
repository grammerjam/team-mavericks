class AuthView 
{
    static auth_works(route_name)
    {
        return {"message": `${route_name} works well` };
    }
}

module.exports = AuthView;