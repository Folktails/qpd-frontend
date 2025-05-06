import * as stylex from '@stylexjs/stylex';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ReactNode } from 'react';
import { useCalendar } from '~/hooks/useCalendar';
import { Icon } from '~/images';
import { colors, flex, typo } from '~/style/common.stylex';

type Props = ReturnType<typeof useCalendar> & {
	// eslint-disable-next-line no-unused-vars
	renderCell: (arg: { date: Date }) => ReactNode;
};

export const Calendar = ({ renderCell, ...props }: Props) => {
	const { onClickDay, weekDays, gridDays, onClickMonth, currentSelectedDate } =
		props;

	return (
		<section {...stylex.props(styles.container)}>
			<header {...stylex.props(styles.weakHeader, flex.between, flex.vertical)}>
				<h5
					{...stylex.props(styles.black90, typo['Body/Body1_16∙100_SemiBold'])}>
					{format(currentSelectedDate, 'yyyy년 MM월', { locale: ko })}
				</h5>

				<div {...stylex.props(styles.arrowWrap, flex.vertical)}>
					<button onClick={() => onClickMonth(-1)}>
						<Icon.ArrowLeft size='14' color={colors.gray90} />
					</button>

					<button onClick={() => onClickMonth(+1)}>
						<Icon.ArrowRight size='14' color={colors.gray90} />
					</button>
				</div>
			</header>

			<div {...stylex.props(styles.weekDays)}>
				{weekDays.map((day, index) => {
					const isLeftSide = index % 7 === 0;
					const isRightSide = index % 7 === 6;

					return (
						<div
							key={day}
							{...stylex.props(
								styles.weekDay,
								styles.gray,
								typo['Caption/Caption2_12∙100_SemiBold'],
								isLeftSide && styles.leftSide,
								isRightSide && styles.rightSide,
							)}>
							{day}
						</div>
					);
				})}
			</div>

			{/* 날짜 그리드 */}
			<div {...stylex.props(styles.grid)}>
				{gridDays.map((date, index) => {
					const isLeftSide = index % 7 === 0;
					const isRightSide = index % 7 === 6;

					return (
						<div
							key={date.toISOString()}
							{...stylex.props(
								styles.dayCell,
								isLeftSide && styles.leftSide,
								isRightSide && styles.rightSide,
							)}
							onClick={() => onClickDay(date)}>
							{renderCell({ date })}
						</div>
					);
				})}
			</div>
		</section>
	);
};

const styles = stylex.create({
	container: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: '4px',
	},
	weakHeader: {
		marginBottom: '16px',
	},
	weekDays: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(7, 1fr)',
		textAlign: 'center',
		gap: '4px',
	},
	weekDay: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(7, 1fr)',
		gap: '4px',
	},
	gray: {
		color: colors.gray80,
	},
	dayCell: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		borderRadius: '4px',
	},
	leftSide: {
		paddingLeft: '0px',
	},
	rightSide: {
		paddingRight: '0px',
	},
	primaryColor: {
		color: colors.main,
	},
	black90: {
		color: colors.gray90,
	},
	arrowWrap: {
		gap: 12,
	},
});
