# 커뮤니티 서비스 API

이 프로젝트는 NestJS 기반의 커뮤니티 서비스 플랫폼 API입니다. 사용자 관리, 게시판 관리, 게시글 관리를 위한 엔드포인트를 제공하며, 역할 기반 접근 제어를 구현하고 있습니다.

## 주요 기능

- 사용자 인증 (회원가입, 로그인, 로그아웃)
- 게시판 관리 (생성, 조회, 수정, 삭제)
- 게시글 관리 (생성, 조회, 수정, 삭제)
- 역할 기반 접근 제어 (일반 사용자, 관리자)
- Swagger API 문서화

## 사전 요구사항

- Node.js (v14 이상)
- npm (v6 이상)
- MySQL (v5.7 이상)

## 설치 방법

1. 저장소 클론:
   ```
   git clone https://github.com/icarus012832/community-service-api.git
   cd community-service-api
   ```

2. 의존성 설치:
   ```
   npm install
   ```

3. 환경 변수 설정:
   프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 변수들을 추가하세요:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_DATABASE=your_db_name
   JWT_SECRET=your_jwt_secret
   ```

4. 데이터베이스 설정:
   - 새 MySQL 데이터베이스 생성
   - `.env` 파일의 데이터베이스 접속 정보 업데이트

## 애플리케이션 실행

```bash
# 개발 모드
$ npm run start

# 개발 모드 (파일 변경 감지)
$ npm run start:dev

# 프로덕션 모드
$ npm run start:prod
```

## API 문서

애플리케이션 실행 후, 다음 주소에서 Swagger API 문서를 확인할 수 있습니다:

```
http://localhost:3000/swagger
```
![image](https://github.com/user-attachments/assets/0ee298bf-b0c0-49b9-b2b0-f9cbdcd543b7)

## 프로젝트 구조

```
src/
├── auth/           # 인증 관련 파일
├── boards/         # 게시판 관리
├── users/          # 사용자 관리
├── app.module.ts   # 메인 애플리케이션 모듈
├── main.ts         # 애플리케이션 진입점
```



