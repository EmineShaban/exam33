import * as api from "./api.js"

export const login = api.login
export const register = api.register
export const logout = api.logoutB

export async function getAllPets(){
    return api.get('/data/pets?sortBy=_createdOn%20desc&distinct=name')
}

export async function getPetById(id){
    return api.get(`/data/pets/${id}`)
}

export async function getMyToys(userId){
    return api.get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function createPet(pet){
    return api.post('/data/pets', pet)
}

export async function editToy(id, toy){
    return api.put('/data/pets/' + id, toy)
}

export async function deletePet(id){
    return api.del('/data/pets/' + id)
}

export async function likeToy(bookId){
    return api.post('/data/likes/', {
    bookId
    })
}

export async function searchToy(query){
    return api.get('/data/books?where=' + encodeURIComponent(`title LIKE "${query}"`))
}


export async function donationPet(petId) {
    return await api.post(`/data/donation`, petId);
}

export async function getTotalDonationCount(petId) {
    return await api.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}


export async function didUserDonation(petId, userId){
    return await api.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}