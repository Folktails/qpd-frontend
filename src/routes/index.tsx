import { createFileRoute, useSearch } from '@tanstack/react-router';
import * as stylex from '@stylexjs/stylex';
import { colors, flex, typo } from '~/shared/style/common.stylex';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { useCalendar } from '~/shared/hooks/useCalendar';
import { Calendar } from '~/domain/home/calendar/calendar';
import { isSameDay } from 'date-fns';

const searchSchema = z.object({
	dateAt: z.string().optional(),
});

type SearchSchema = z.infer<typeof searchSchema>;

export const Route = createFileRoute('/')({
	component: RouteComponent,
	validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
	const search = useSearch({ from: '/' });
	const calendar = useCalendar<SearchSchema>(search);

	const renderCell = ({ date }: { date: Date }) => {
		const isCurrentMonth = date.getMonth() + 1 === new Date().getMonth() + 1;

		const isToday = isSameDay(date, new Date());

		return (
			<div {...stylex.props(styles.cellWrap)}>
				<div {...stylex.props(isToday && styles.circle)} />

				<div
					{...stylex.props(
						styles.cell,
						!isCurrentMonth && styles.gray,
						isToday && styles.white,
						typo['Caption/Caption2_12∙100_SemiBold'],
					)}>
					{date.getDate()}
				</div>

				{!isToday && <div {...stylex.props(styles.dot)} />}
			</div>
		);
	};

	return (
		<section {...stylex.props(styles.base)}>
			<div {...stylex.props(styles.promotion, flex.column)}>
				<div {...stylex.props(styles.promotionTitle, flex.vertical)}>
					<img
						src='/image/icon/mail.png'
						alt='프로모션 아이콘'
						{...stylex.props(styles.promotionIcon)}
					/>

					<h3
						{...stylex.props(
							styles.primaryBlack,
							typo['Heading/lines/H3_20∙130_SemiBold_lines'],
						)}>
						지금까지 <span {...stylex.props(styles.primaryColor)}>총 13번</span>{' '}
						답변했어요!
					</h3>
				</div>

				<p
					{...stylex.props(
						styles.gray,
						typo['Body/lines/Body3_14∙150_Regular_lines'],
					)}>
					30개의 생각을 기록하면, 5개의 답변이 담긴 실물 엽서를 보내드려요.
				</p>
			</div>

			<div {...stylex.props(styles.calendar)}>
				<Calendar {...calendar} renderCell={renderCell} />
			</div>
		</section>
	);
}

const styles = stylex.create({
	base: {
		padding: '24px 18px',
	},
	promotion: {
		width: '100%',
		padding: '12px',
		borderRadius: '14px',
		backgroundColor: colors.gray20,
		gap: '8px',
	},
	promotionTitle: {
		gap: '8px',
	},
	promotionIcon: {
		width: '40px',
		height: '40px',
	},
	primaryBlack: {
		color: colors.gray90,
	},
	primaryColor: {
		color: colors.main,
	},
	gray: {
		color: colors.gray80,
	},
	white: {
		color: colors.white,
	},
	wordBreak: {
		wordBreak: 'break-all',
	},
	calendar: {
		paddingTop: 28,
		paddingBottom: 32,
		borderBottom: `1px solid ${colors.gray40}`,
		marginBottom: 24,
	},
	cellWrap: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		gap: 4,
	},
	circle: {
		position: 'absolute',
		top: 4,
		borderRadius: '50%',
		width: 22,
		height: 22,
		zIndex: -1,
		backgroundColor: colors.main,
	},
	cell: {
		borderRadius: '50%',
		color: colors.gray90,
		padding: '10px',
	},
	dot: {
		width: '4px',
		borderRadius: '50%',
		height: '4px',
		backgroundColor: colors.main,
	},
});
