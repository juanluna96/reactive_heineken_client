import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import { AdminSidebar } from '../AdminSidebar';
import { ScreenOverlay } from '../ScreenOverlay';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './AdminDashboardScreen.styles';
import { useAdminDashboardScreen } from './AdminDashboardScreen.hooks';

export const AdminDashboardScreen = () => {
  const {
    t,
    isLoading,
    isRefreshing,
    isError,
    isEmpty,
    totals,
    chartBars,
    topBeerMasters,
    distribution,
    recentRatings,
    handleRefresh,
  } = useAdminDashboardScreen();

  const sidebar = <AdminSidebar activeItem="dashboard" />;

  const background = (
    <S.Background>
      <picture>
        <source media={`(min-width: ${TABLET_BREAKPOINT})`} srcSet={backgroundImageLaptop} />
        <S.BackgroundImage src={backgroundImage} alt="" />
      </picture>
      <ScreenOverlay />
    </S.Background>
  );

  if (isLoading) {
    return (
      <S.Screen>
        {background}
        {sidebar}
        <S.Main>
          <S.StatusScreen>
            <S.StatusSubtitle>{t.adminDashboard.states.loading}</S.StatusSubtitle>
          </S.StatusScreen>
        </S.Main>
      </S.Screen>
    );
  }

  if (isError || !totals || !distribution) {
    return (
      <S.Screen>
        {background}
        {sidebar}
        <S.Main>
          <S.StatusScreen>
            <S.StatusTitle>{t.adminDashboard.states.error}</S.StatusTitle>
            <S.RefreshButton type="button" onClick={handleRefresh} whileTap={{ scale: 0.96 }}>
              <S.RefreshIcon />
              {t.adminDashboard.refreshLabel}
            </S.RefreshButton>
          </S.StatusScreen>
        </S.Main>
      </S.Screen>
    );
  }

  return (
    <S.Screen>
      {background}
      {sidebar}

      <S.Main>
        <S.TopBar>
          <S.TitleGroup>
            <S.PageTitle>{t.adminDashboard.pageTitle}</S.PageTitle>
            <S.PageSubtitle>{t.adminDashboard.pageSubtitle}</S.PageSubtitle>
          </S.TitleGroup>
          <S.TopBarActions>
            <S.PeriodBadge>
              <S.PeriodIcon />
              {t.adminDashboard.periodLabel}
            </S.PeriodBadge>
            <S.RefreshButton
              type="button"
              onClick={handleRefresh}
              $spinning={isRefreshing}
              whileTap={{ scale: 0.96 }}
            >
              <S.RefreshIcon />
              {t.adminDashboard.refreshLabel}
            </S.RefreshButton>
          </S.TopBarActions>
        </S.TopBar>

        {isEmpty ? (
          <S.StatusScreen>
            <S.StatusTitle>{t.adminDashboard.states.emptyTitle}</S.StatusTitle>
            <S.StatusSubtitle>{t.adminDashboard.states.emptySubtitle}</S.StatusSubtitle>
          </S.StatusScreen>
        ) : (
          <S.Content>
            <S.KpiGrid>
              <S.KpiCard>
                <S.KpiIconBackdrop>
                  <S.RatingIcon />
                </S.KpiIconBackdrop>
                <S.KpiLabel>{t.adminDashboard.kpis.totalRatings}</S.KpiLabel>
                <S.KpiValueRow>
                  <S.KpiValue>{totals.totalRatings}</S.KpiValue>
                  {totals.trendDirection && totals.trendLabel && (
                    <S.TrendBadge $direction={totals.trendDirection}>
                      {totals.trendLabel}
                      {totals.trendDirection === 'up' ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                    </S.TrendBadge>
                  )}
                </S.KpiValueRow>
              </S.KpiCard>

              <S.KpiCard>
                <S.KpiIconBackdrop>
                  <S.RatingIcon />
                </S.KpiIconBackdrop>
                <S.KpiLabel>{t.adminDashboard.kpis.averageRating}</S.KpiLabel>
                <S.KpiValueRow>
                  <S.KpiValue $accent>{totals.averageRating}</S.KpiValue>
                  <S.StarsRow>
                    {Array.from({ length: 5 }).map((_, index) =>
                      index < totals.averageRatingStars ? <S.StarFilled key={index} /> : <S.StarEmpty key={index} />,
                    )}
                  </S.StarsRow>
                </S.KpiValueRow>
              </S.KpiCard>

              <S.KpiCard>
                <S.KpiIconBackdrop>
                  <S.RestaurantIcon />
                </S.KpiIconBackdrop>
                <S.KpiLabel>{t.adminDashboard.kpis.restaurantsRegistered}</S.KpiLabel>
                <S.KpiValueRow>
                  <S.KpiValue>{totals.restaurantsCount}</S.KpiValue>
                  <S.SubtleBadge>{totals.newRestaurantsLabel}</S.SubtleBadge>
                </S.KpiValueRow>
              </S.KpiCard>

              <S.KpiCard>
                <S.KpiIconBackdrop>
                  <S.BeerMasterIcon />
                </S.KpiIconBackdrop>
                <S.KpiLabel>{t.adminDashboard.kpis.beerMastersRegistered}</S.KpiLabel>
                <S.KpiValueRow>
                  <S.KpiValue>{totals.beerMastersCount}</S.KpiValue>
                  <S.SubtleBadge>{totals.newBeerMastersLabel}</S.SubtleBadge>
                </S.KpiValueRow>
              </S.KpiCard>
            </S.KpiGrid>

            <S.MainGrid>
              <S.AnalyticsColumn>
                <S.Panel>
                  <S.PanelHeader>
                    <div>
                      <S.PanelTitle>{t.adminDashboard.chart.title}</S.PanelTitle>
                      <S.PanelSubtitle>{t.adminDashboard.chart.subtitle}</S.PanelSubtitle>
                    </div>
                  </S.PanelHeader>
                  {chartBars.every((bar) => bar.count === 0) ? (
                    <S.EmptyMessage>{t.adminDashboard.chart.empty}</S.EmptyMessage>
                  ) : (
                    <>
                      <S.ChartArea>
                        {chartBars.map((bar) => (
                          <S.ChartBar
                            key={bar.key}
                            $heightPct={bar.heightPct}
                            title={`${bar.label}: ${bar.count}`}
                          />
                        ))}
                      </S.ChartArea>
                      <S.ChartAxis>
                        {chartBars
                          .filter((_, index) => index % Math.ceil(chartBars.length / 5) === 0)
                          .map((bar) => (
                            <span key={bar.key}>{bar.label}</span>
                          ))}
                      </S.ChartAxis>
                    </>
                  )}
                </S.Panel>

                <S.Panel>
                  <S.PanelHeader>
                    <S.PanelTitle>{t.adminDashboard.rankings.title}</S.PanelTitle>
                  </S.PanelHeader>
                  {topBeerMasters.length === 0 ? (
                    <S.EmptyMessage>{t.adminDashboard.rankings.empty}</S.EmptyMessage>
                  ) : (
                    <S.TableScroll>
                      <S.Table>
                        <S.Thead>
                          <tr>
                            <S.Th>{t.adminDashboard.rankings.rank}</S.Th>
                            <S.Th>{t.adminDashboard.rankings.master}</S.Th>
                            <S.Th>{t.adminDashboard.rankings.restaurant}</S.Th>
                            <S.Th style={{ textAlign: 'center' }}>{t.adminDashboard.rankings.reviews}</S.Th>
                            <S.Th style={{ textAlign: 'center' }}>{t.adminDashboard.rankings.avgRating}</S.Th>
                          </tr>
                        </S.Thead>
                        <tbody>
                          {topBeerMasters.map((entry) => (
                            <S.Tr key={`${entry.rank}-${entry.name}`}>
                              <S.Td>
                                <S.RankBadge $isTop={entry.rank === 1}>
                                  {String(entry.rank).padStart(2, '0')}
                                </S.RankBadge>
                              </S.Td>
                              <S.Td>
                                <S.MasterCell>
                                  <S.Avatar>{entry.initials}</S.Avatar>
                                  <S.MasterName>{entry.name}</S.MasterName>
                                </S.MasterCell>
                              </S.Td>
                              <S.Td>
                                <S.RestaurantText>{entry.restaurantName}</S.RestaurantText>
                              </S.Td>
                              <S.Td style={{ textAlign: 'center' }}>{entry.ratingsCount}</S.Td>
                              <S.Td>
                                <S.RatingCell>
                                  <S.RatingValue>{entry.averageRating}</S.RatingValue>
                                  <S.StarFilled />
                                </S.RatingCell>
                              </S.Td>
                            </S.Tr>
                          ))}
                        </tbody>
                      </S.Table>
                    </S.TableScroll>
                  )}
                </S.Panel>
              </S.AnalyticsColumn>

              <S.SideColumn>
                <S.Panel>
                  <S.PanelTitle style={{ marginBottom: 24 }}>{t.adminDashboard.distribution.title}</S.PanelTitle>
                  <S.DonutWrapper>
                    <S.DonutSvg viewBox="0 0 160 160">
                      <S.DonutTrack cx={80} cy={80} r={70} />
                      <S.DonutValue
                        cx={80}
                        cy={80}
                        r={70}
                        strokeDasharray={distribution.circumference}
                        strokeDashoffset={distribution.dashOffset}
                      />
                    </S.DonutSvg>
                    <S.DonutCenter>
                      <S.DonutPct>{distribution.fiveStarPct}%</S.DonutPct>
                      <S.DonutCaption>{t.adminDashboard.distribution.fiveStarShare}</S.DonutCaption>
                    </S.DonutCenter>
                  </S.DonutWrapper>
                  <S.DistributionList>
                    {distribution.items.map((item) => (
                      <S.DistributionRow key={item.rating}>
                        <S.DistributionLeft>
                          <S.DistributionDot $rating={item.rating} />
                          <span>{item.label}</span>
                        </S.DistributionLeft>
                        <S.DistributionCount>{item.count}</S.DistributionCount>
                      </S.DistributionRow>
                    ))}
                  </S.DistributionList>
                </S.Panel>

                <S.FeedPanel>
                  <S.FeedHeader>
                    <S.PanelTitle>{t.adminDashboard.feed.title}</S.PanelTitle>
                  </S.FeedHeader>
                  <S.FeedList>
                    {recentRatings.length === 0 ? (
                      <S.EmptyMessage>{t.adminDashboard.feed.empty}</S.EmptyMessage>
                    ) : (
                      recentRatings.map((review) => (
                        <S.FeedCard key={review.id}>
                          <S.FeedCardHeader>
                            <S.FeedMeta>
                              <S.Avatar $size={32}>{review.initials}</S.Avatar>
                              <div>
                                <S.FeedName>{review.customerName}</S.FeedName>
                                <S.FeedTime>{review.relativeTime}</S.FeedTime>
                              </div>
                            </S.FeedMeta>
                            <S.StarsRow>
                              {Array.from({ length: 5 }).map((_, index) =>
                                index < review.stars ? <S.StarFilled key={index} /> : <S.StarEmpty key={index} />,
                              )}
                            </S.StarsRow>
                          </S.FeedCardHeader>
                          <S.FeedContext>
                            {review.beerMasterName} · {review.restaurantName}
                          </S.FeedContext>
                          <S.FeedComment>
                            {review.comment ? `"${review.comment}"` : t.adminDashboard.feed.noComment}
                          </S.FeedComment>
                        </S.FeedCard>
                      ))
                    )}
                  </S.FeedList>
                </S.FeedPanel>
              </S.SideColumn>
            </S.MainGrid>
          </S.Content>
        )}
      </S.Main>
    </S.Screen>
  );
};
