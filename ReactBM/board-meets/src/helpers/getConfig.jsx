export const getConfig = () => {
    const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heHVzbWF4MkBnbWFpbC5jb20iLCJyb2xlIjoicGxheWVyIiwibmJmIjoxNjY5MjI1OTUxLCJleHAiOjE2NjkyMjk1NTEsImlhdCI6MTY2OTIyNTk1MX0.7YxgTpWAjJ0YJi7zbNndyPETZcCNJxjnvu2I6LgPeww";
    return ({headers : {Authorization: `Bearer ${token}`}});
};
