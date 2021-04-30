const { test } = use('Test/Suite')('User Validation');
const { validate } = use('Validator');
const StoreUser = use('App/Validators/StoreUser');

const Factory = use('Factory');

test("must succeed in validating a user's registration information", async ({ assert }) => {
  const user = await Factory.model('App/Models/User').make({
    password: 'Mypassword8',
    password_confirmation: 'Mypassword8',
  });

  const userJSON = user.toJSON();

  const storeUser = new StoreUser();

  const validation = await validate(userJSON, storeUser.rules);

  assert.equal(validation.messages(), null);
});

test('should return an error in the name field when trying to validate a name with special characters', async ({ assert }) => {
  const user = await Factory.model('App/Models/User').make({
    name: 'Jhon> Doe3',
  });

  const userJSON = user.toJSON();

  const storeUser = new StoreUser();

  const validation = await validate(userJSON, storeUser.rules);

  const validationError = validation.messages()[0];

  assert.equal(validationError.field, 'name');

  assert.equal(validationError.validation, 'regex');
});

test('should return an error in the email field when trying to validate an invalid email', async ({ assert }) => {
  const user = await Factory.model('App/Models/User').make({
    email: 'jhondoegmail.com',
  });

  const userJSON = user.toJSON();

  const storeUser = await new StoreUser();

  const validation = await validate(userJSON, storeUser.rules);

  const validationError = validation.messages()[0];

  assert.equal(validationError.field, 'email');

  assert.equal(validationError.validation, 'email');
});
