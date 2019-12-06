export const routes = {
    login: () => { return "/login" },
    logout: () => { return "/logout" },
    register: () => { return "/register" },
    home: () => { return "/" },
    createRecipe: () => { return "/recipe/create" },
    viewRecipe: (recipe_id) => { return "/recipe/" + recipe_id + "/view" },
    editRecipe: (recipe_id) => { return "/recipe/" + recipe_id + "/edit" },
    editComment: (comment_id) => { return "/comment/" + comment_id + "/edit" },
    userRecipes: (user_id) => { return "/user/" + user_id + "/recipes" }
};