# TEST

## description

<hr/>
**./helpers/testHelpers.js**에는 token 생성을 위한 코드가 들어있습니다.
**award.test.js**는 award에 대한 http request를 test하기 위한 코드가 들어있습니다.

```
const testUserEmail = 'Insert_test_user_email';
const testUserPassword = 'Insert_test_user_password';
```

- 배포 전이기 때문에, 개인 데이터베이스 서버를 사용한다고 가정하고, 회원 가입을 통해 테스트 유저를 생성합니다.
- 각 변수에 테스트 유저의 이메일과 패스워드를 할당합니다.
