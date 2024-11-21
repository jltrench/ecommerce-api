import { PaginationParams } from '../interfaces/pagination.interface';
import { QueryProductDto } from '../../modules/products/dto/query-product.dto';

export function createPaginationParams(
  query: QueryProductDto,
): PaginationParams {
  const {
    search,
    orderBy = 'createdAt',
    order = 'desc',
    page = 1,
    limit = 10,
  } = query;
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }
    : {};

  return {
    skip,
    take: limit,
    orderBy: { [orderBy]: order },
    where,
  };
}
