/// <reference types="cypress" />

describe("api testing", () => {
  beforeEach(() => {});

  it("todo", () => {
    let rand = Math.floor(100000 + Math.random() * 900000);
    let bodyId;
    let postId;
    const title = "Aduro tumultus commodo accusamus corrigo suus doloribus.";
    const body =
      "Rerum cursim cimentarius. Audacia aggredior votum. Abundans nemo carbo. Comminor volaticus cumque. A creta crur. Tremo acceptus terreo. Vinum aggredior tergo. Tamdiu sonitus omnis. Quia taedium suppono. Aegrus acer umquam. Ea apud uterque. Balbus vesica defero. Defaeco iusto traho. Thema velit capitulus. Thorax antiquus umerus. Stultus tantum strenuus. Quisquam basium vir. Hic tripudio custodia. Tondeo carpo censura.";
    cy.request({
      method: "POST",
      url: "https://gorest.co.in/public/v2/users",
      headers: {
        Authorization: `Bearer ${Cypress.env("bearer")}`,
      },
      body: {
        name: "Sumitra Kaur",
        email: `k${rand}@schultz-lakin.example`,
        gender: "female",
        status: "active",
      },
    })
      .then((response) => {
        expect(response.status).to.eq(201);
        bodyId = response.body.id;
      })
      .then(() => {
        cy.request({
          method: "POST",
          url: `https://gorest.co.in/public/v2/users/${bodyId}/posts`,
          headers: {
            Authorization: `Bearer ${Cypress.env("bearer")}`,
          },
          body: {
            title: title,
            body: body,
          },
        })
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.user_id).to.eq(bodyId);
            postId = response.body.id;
          })
          .then(() => {
            cy.request({
              method: "GET",
              url: `https://gorest.co.in/public/v2/posts/${postId}`,
              headers: {
                Authorization: `Bearer ${Cypress.env("bearer")}`,
              },
            })
              .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.eq(postId);
                expect(response.body.user_id).to.eq(bodyId);
                expect(response.body.title).to.eq(title);
                expect(response.body.body).to.eq(body);
              })
              .then(() => {
                cy.request({
                  method: "PUT",
                  url: `https://gorest.co.in/public/v2/posts/${postId}`,
                  headers: {
                    Authorization: `Bearer ${Cypress.env("bearer")}`,
                  },
                  body: {
                    title: `${title} [Updated]`,
                  },
                })
                  .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.title).to.eq(`${title} [Updated]`);
                  })
                  .then(() => {
                    cy.request({
                      method: "DELETE",
                      url: `https://gorest.co.in/public/v2/posts/${postId}`,
                      headers: {
                        Authorization: `Bearer ${Cypress.env("bearer")}`,
                      },
                    }).then((response) => {
                      expect(response.status).to.eq(204);
                    });
                  })
                  .then(() => {
                    cy.request({
                      method: "GET",
                      url: `https://gorest.co.in/public/v2/posts/${postId}`,
                      headers: {
                        Authorization: `Bearer ${Cypress.env("bearer")}`,
                      },
                      failOnStatusCode: false,
                    }).then((response) => {
                      expect(response.status).to.eq(404);
                    });
                  });
              });
          });
      });
  });
});
