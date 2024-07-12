import type { FC } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

interface SkeletonBodyComponentProps {}

const SkeletonBodyComponent: FC<SkeletonBodyComponentProps> = ({}) => {
        return (<Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                pt: 0.5,
                justifyContent: "end",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Skeleton className="py-1" animation="wave" width="50%" />
            </Box>
            <Box
              sx={{
                pt: 0.5,
                justifyContent: "initial",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={150}
                height={150}
                sx={{ borderRadius: "25px" }}
              />
            </Box>
            <Box sx={{ pt: 0.5 }}>
              <Skeleton className="py-1" animation="wave" width="90%" />
              <Box
                sx={{
                  pt: 1,
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Skeleton animation="wave" width="15%" />
                <Skeleton animation="wave" width="50%" />
              </Box>
              <Box
                sx={{
                  pt: 1,
                }}
              >
                <Skeleton animation="wave" width="100%" />
                <Skeleton animation="wave" width="80%" />
              </Box>
              <Box
                sx={{
                  pt: 1,
                  justifyContent: "space-between",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "70%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Skeleton
                      className="mx-1"
                      animation="wave"
                      width="40%"
                    />
                    <Skeleton
                      className="mx-1"
                      animation="wave"
                      width="40%"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Skeleton
                      className="mx-1"
                      animation="wave"
                      width="40%"
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    justifyContent: "space-between",
                    display: "flex",
                    alignItems: "start",
                    width: "30%",
                  }}
                >
                  <Skeleton animation="wave" width="80%" />
                </Box>
              </Box>
              <Box
                sx={{
                  pt: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Skeleton className="mx-1" animation="wave" width="30%" />
                <Skeleton className="mx-1" animation="wave" width="30%" />
                <Skeleton className="mx-1" animation="wave" width="30%" />
              </Box>
              <Box
                sx={{
                  pt: 0.5,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Skeleton className="py-1" animation="wave" width="40%" />
                <Skeleton className="py-1" animation="wave" width="20%" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <Skeleton
                  className="py-2 mx-1"
                  animation="wave"
                  width="40%"
                />
                <Skeleton
                  className="py-2 mx-1"
                  animation="wave"
                  width="40%"
                />
              </Box>
            </Box>
          </Box>);
}
export default SkeletonBodyComponent;