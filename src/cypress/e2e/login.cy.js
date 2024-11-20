describe("Login Form Testleri", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Başarılı form doldurulduğunda success sayfası açılıyor", () => {
    cy.get('input[type="email"]').type("test@example.com");
    cy.get('input[type="password"]').type("StrongP@ssw0rd!");
    cy.get('input[type="checkbox"]').check();
    cy.get("button").click();
    cy.url().should("include", "/success");
    cy.contains("Başarılı bir şekilde giriş yaptınız!").should("be.visible");
  });

  it("Hatalı girişlerde beklenen hata mesajları ve disabled buton kontrolü", () => {
    cy.get('input[type="email"]').type("wrong-email");
    cy.get("button").should("be.disabled");
    cy.contains("Geçerli bir email adresi giriniz").should("be.visible");

    cy.get('input[type="password"]').type("weak");
    cy.get("button").should("be.disabled");
    cy.contains("Şifre güçlü olmalı").should("be.visible");

    cy.get('input[type="email"]').clear().type("test@example.com");
    cy.get('input[type="password"]').clear().type("StrongP@ssw0rd!");
    cy.get("button").should("be.disabled");
    cy.contains("Şartları kabul etmelisiniz").should("be.visible");
  });
});
