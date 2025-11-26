import { Test, TestingModule } from '@nestjs/testing';
import { IssueService } from './issue.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'process';
import { IssueStatus } from '@prisma/client';

describe('IssueService', () => {
  let service: IssueService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueService,
        {
          provide: PrismaService,
          useValue: {
            issue: {
              create: jest.fn(),
              findMany: jest.fn(),
              findOne: jest.fn(),
              update: jest.fn(),
              remove: jest.fn()
            }
          }
        }
      ],
    }).compile();

    service = module.get<IssueService>(IssueService);
    prisma = module.get(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create an issue with default OPEN status', async ()=>{
    const dto = { title: "Vibration high", description: "Bearing 3"}

    const created = { id: 1, status: IssueStatus.OPEN, ...dto} as any

    (prisma.issue.create as jest.Mock).mockResolvedValue(created)

    const result = await service.create(dto)

    expect(prisma.issue.create).toHaveBeenLastCalledWith({
      data: { ...dto, status: IssueStatus.OPEN}
    })
    expect(result).toEqual(created)
  })

  it('returns all issues ordered by createdAt desc', async () =>{
    const items = [{id: 1}, {id: 2}] as any[];
    (prisma.issue.findMany as jest.Mock).mockResolvedValue(items)

    const result = await service.findAll();

    expect(prisma.issue.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc'}
    })

    expect(result).toEqual(items);
  })

  it('updates an issues', async () => {
    const updated = { id: 1, status: IssueStatus.DONE} as any;

    (prisma.issue.update as jest.Mock).mockResolvedValue(updated)

    const result = await service.update(1, { status: IssueStatus.DONE} as any)

    expect(prisma.issue.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: IssueStatus.DONE}
    })
    expect(result).toEqual(updated);
  })
});
