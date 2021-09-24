import Keycloak from 'keycloak-backend';

const config = {
  realm: "master",
  "auth-server-url": "https://keycloak.pingpu.org/",
  "ssl-required": "external",
  client_id: "todo-server",
  client_secret: "d8c2d5a0-8113-4fb1-a789-9b0505306add",
};

const cert = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwaVw823WgqFjuTlXnhD9KuMxgEawckgcgEiC1lznF3sMc8Y1jCTgVdEaZ99VDOVKzLXJHphMx+iBJ8a/cU7BoEeWTFHP6GQT6BzwlvnaRydMfhxJ+ziKAdVLxg0gEYTDo95wcjGw+AYnyN5e5kLSUog9WMwKvawDdX3aoMiNq4zEjPtC+WeWwP+qNjUpDK4NNmWJm0nzfR8/mnlde0lEGQGfXsDsu7fyfnO7gWNZR3abbfwNdulcS94FGBsEJT+sAOL0ByVmV4dD8ks7Zt1Wj76iU94H91B/X8e8y5Mhl/K4+WU6mJtMxxwC42RlM6NPsw0cqN5Y/l4mbr2MpyIsvQIDAQAB
-----END PUBLIC KEY-----`;

export default async function handler(req, res) {
  const keycloak = Keycloak(config);
  const token = req.headers.authorization.split(' ')[1];
  // const result = await keycloak.jwt.verify(token);
  const result = await keycloak.jwt.verifyOffline(token, cert);
  res.status(200).json(result.content);
}
