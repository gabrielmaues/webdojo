describe('GET /api/users', () => {

    const herores = [
  {
    name: "Bruce Wayne",
    email: "batman@justiceleague.com",
    password: "pwd123"
  },
  {
    name: "Clark Kent",
    email: "superman@justiceleague.com",
    password: "pwd123"
  },
  {
    name: "Diana Prince",
    email: "wonderwoman@justiceleague.com",
    password: "pwd123"
  },
  {
    name: "Barry Allen",
    email: "flash@justiceleague.com",
    password: "pwd123"
  },
  {
    name: "Arthur Curry",
    email: "aquaman@justiceleague.com",
    password: "pwd123"
  }
];

    before(()=>{
        herores.forEach((hero)=>{
            cy.postUser(hero)
        })
    })

    it('Deve retornar uma lista de usuários', () => {
       cy.getUsers().then(response => {
            expect(response.status).to.eq(200)

            herores.forEach((hero) =>{
                const found = response.body.find((user) => user.email == hero.email)
                expect(found.name).to.eq(hero.name)
                expect(found.email).to.eq(hero.email)
                expect(found).to.have.property('id')
            })
        })
    })
})