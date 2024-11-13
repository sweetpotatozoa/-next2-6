import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AuthorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User from request:', user); // 디버그용 로그
    const resourceOwnerId = request.body.user.id; // 리소스 작성자의 ID가 들어있는 위치에 따라 수정 필요
    const authorId = parseInt(resourceOwnerId, 10);
    console.log('Resource owner ID:', authorId); // 디버그용 로그

    // 작성자 여부를 확인하여 본인이 아닐 경우 접근 금지
    if (user.userId !== authorId) {
      throw new ForbiddenException('넌 못 지워');
    }

    return true;
  }
}
