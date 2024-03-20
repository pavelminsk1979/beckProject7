export const createItemsForTest={
    createOneItem(){
        return{
            login:'3363337',
            email:'pavelminsk1979@mail.ru',
            password:'11111pasw'
        }
    },

    createManyItems(count:number){
        const arrayItems= []
        for(let i=0;i<count;i++){
            arrayItems.push({
                login:'kljaf'+i,
                email:`lkajf${i}@ru`,
                password:`76545987${i}`
            })
        }
        return arrayItems
    }
}