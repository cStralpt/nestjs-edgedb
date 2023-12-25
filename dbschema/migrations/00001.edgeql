CREATE MIGRATION m1zsnmcqcqfwmejfptwehgyylxmvnpfwx2w3idoudr2b53vnqzqv3q
    ONTO initial
{
  CREATE TYPE default::Todos {
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY value: std::str;
  };
  CREATE TYPE default::User {
      CREATE PROPERTY password: std::str;
      CREATE PROPERTY username: std::str;
  };
};
