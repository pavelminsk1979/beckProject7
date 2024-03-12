export const createItemsForTest={
    createOneItem(){
        return{
            login:'kljaf',
            email:'lkajf@ru',
            password:'76545987'
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