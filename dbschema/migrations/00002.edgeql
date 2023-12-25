CREATE MIGRATION m1plomlosmc5dyjy6aezsvhha2urbehcmyeorgt7hof72pi6pyqtna
    ONTO m1zsnmcqcqfwmejfptwehgyylxmvnpfwx2w3idoudr2b53vnqzqv3q
{
  ALTER TYPE default::User {
      ALTER PROPERTY password {
          SET REQUIRED USING ('123');
      };
      ALTER PROPERTY username {
          SET REQUIRED USING ('Myname');
      };
  };
};
