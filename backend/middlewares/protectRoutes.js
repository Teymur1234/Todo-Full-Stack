import jwt from 'jsonwebtoken'

const protectRoutes = (request,response,next)=>{
try {
    const token = request.cookies.jwt
    if (!token) {
     return   response
        .status(404)
        .send({error:"Not Authorized - No token provided"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    if (!decoded) {
     return   response
        .status(404)
        .send({error:"Not Authorized - Invalid token"})
        
    }
    next()
} catch (error) {
    console.log(`Error in the protectRoutes middleware:${error.message}`);
    response.status(404).send({error:error.message})
}
}

export default protectRoutes;